from flask import request, render_template

import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
client = gspread.authorize(creds)

def extract():
    sheet = client.open('Personality Test').sheet1
    records = sheet.get_all_records() # list of dictionaries
    master = []
    # [{'name':'Benjamin','answers':[1,2,3,4,3,2,1,2,3,4]},...]
    for row in records:
        response = [None] * 10
        for key in row:
            if key != 'Name':
                response[int(key) - 1] = int(row[key])
        member = {'name' : str(row['Name']), 'answers': response}
        master.append(member)
    return master

def result():
    try:
        master = extract()
        data = request.form

        html = render_template('results.html')
    except:
        html = render_template('sorry.html')
    return html
