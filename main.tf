provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "hotelmain" {
  bucket = "hotelmain"
}

resource "aws_s3_bucket_policy" "hotelmain_policy" {
  bucket = aws_s3_bucket.hotelmain.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::hotelmain/*"
      }
  ]
}
POLICY
}
