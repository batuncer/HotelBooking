terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
  required_version = ">= 1.0.0"
}

provider "aws" {
  region     = "us-west-2"
  access_key = var.access_key
  secret_key = var.secret_key
}

resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.rsa_4096.private_key_pem
  filename = var.key_name
  file_permission = "0400" # Dosya iznini 400 olarak ayarla
}

resource "aws_security_group" "instance_security_group" {
  name        = "instance_security_group"
  description = "Security group for instance"

   ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "public_instance" {
  ami                    = "ami-08f7912c15ca96832"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.key_pair.key_name
  security_groups        = [aws_security_group.instance_security_group.name]

  tags = {
    Name = "cfy_hotel_instance"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = local_file.private_key.filename
      host        = aws_instance.public_instance.public_ip
    }

    inline = [
      "sleep 30", # Bekleme süresi ekleyin
      "sudo yum update -y",
      "sudo yum install docker -y",
      "sudo systemctl start docker",
      "sudo systemctl enable docker"
    ]
  }
}
