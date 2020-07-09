import os
from flask import request, render_template
import math
import json
import urllib

import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
try:
    creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
except:
    json_creds = os.getenv("CLIENT_SECRET_JSON")
    creds_dict = json.loads(json_creds)
    creds_dict["private_key"] = creds_dict["private_key"].replace("\\\\n", "\n")
    creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
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

        data = json.loads(urllib.parse.unquote(request.form.get("data")))
        dataList = [None] * 10
        for i in range(0,10):
            dataList[i] = int(data.get(str(i)))

        mostSimilar = "nobody"
        leastDistance = None
        for member in master:
            answers = member.get("answers")
            sumSquares = 0
            for i in range(0,10):
                memberChoice = answers[i]
                clientChoice = dataList[i]
                sumSquares += math.pow(clientChoice - memberChoice, 2)
            vectorDistance = math.sqrt(sumSquares)
            try:
                if vectorDistance < leastDistance:
                    leastDistance = vectorDistance
                    mostSimilar = member.get("name")
            except:
                leastDistance = vectorDistance
                mostSimilar = member.get("name")

        html = render_template('results.html', name=mostSimilar)
    except:
        html = render_template('error.html')
    return html
