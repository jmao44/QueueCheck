import boto3
import time
import datetime

aws_access_key_id = 'AKIA3QZZ6P4BPCBXCTF4'
aws_access_key = '7n5i0ECZfJJ8fhk6z+9O3yw1Whe28DSp8JQrfqgo'
aws_region_name = 'us-east-1'
client = boto3.client('dynamodb', region_name=aws_region_name,
                          aws_access_key_id=aws_access_key_id,
                          aws_secret_access_key=aws_access_key)
