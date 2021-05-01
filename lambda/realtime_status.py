import boto3
import time
import datetime

aws_access_key_id = 'AKIA3QZZ6P4BPCBXCTF4'
aws_access_key = '7n5i0ECZfJJ8fhk6z+9O3yw1Whe28DSp8JQrfqgo'
aws_region_name = 'us-east-1'
client = boto3.client('dynamodb', region_name=aws_region_name,
                          aws_access_key_id=aws_access_key_id,
                          aws_secret_access_key=aws_access_key)

location_table_name = 'Location'
estimation_table_name = 'Estimation'
window_width_minutes = 10

def lambda_handler(event, context):
    min_time = min_submitted_time()
    all_location_ids = get_all_location_ids(client)
    
    for location_id in all_location_ids:
        response = client.query(
            TableName=estimation_table_name,
            Limit=1000,
            KeyConditionExpression='Location_ID = :location_id AND Time_Submitted > :min_time',
            ExpressionAttributeValues={':location_id': {'N': location_id}, ':min_time': {'N': str(min_time)}}
        )
        
        wait_time = -1
        if response['Count'] > 0:
            wait_times = [int(response['Items'][i]['Est_Minutes']['N']) for i in range(len(response['Items']))]
            wait_time = sum(wait_times) / len(wait_times)
        
        client.update_item(
            TableName=location_table_name,
            Key={
                'Location_ID': {
                    'N': location_id
                }
            },
            AttributeUpdates={
                'Wait_Time': {
                    'Value': {
                        'N': str(wait_time)
                    },
                    'Action': 'PUT'
                }
            }
        )

def get_all_location_ids(client):
    response = client.scan(TableName=location_table_name)
    location_ids = [response['Items'][i]['Location_ID']['N'] for i in range(len(response['Items']))]
    return location_ids

def min_submitted_time():
    now = time.time()
    min_datetime = datetime.datetime.fromtimestamp(now) - datetime.timedelta(minutes=window_width_minutes)
    min_time = min_datetime.timestamp()
    return min_time
