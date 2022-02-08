from flask import Blueprint, render_template, request, flash, url_for, make_response
import json
from flask import session as sssession

from . import create_quiz, add_question, quiz, get_quiz,gq
quiz = Blueprint('quiz', __name__, template_folder='templates')

@quiz.route('/create', methods=["POST", 'GET'])
def create():
    if request.method == "POST":
        b = request.form
        b = dict(b)
        g = str(sssession['name'])
        if b['Retakable'] == 'yes':
            l = True
        else:
            l = False
        if b['Random-order'] == 'yes':
            ll = True
        else:
            ll = False
        q = create_quiz(g, b['quiz name'], l, ll)
        amm = 1
        #qu = question(question=q,correct_answer=ca,question_data= qs,owner_id=quiz_.id,question_type=qt,ammounts=worth)
        x = True
        while x == True:
            if f"quantity_{amm}" in b:
                if b[f'type_{amm}'] == 'Free response':
                    qd = b[f'question_answer_fr_{amm}']
                    ca = b[f'question_answer_fr_{amm}']
                if b[f'type_{amm}'] == 'Multiple choice':
                    qd = []
                    if b[f'mc1_{amm}'] != '' or ' ':
                        qd.append(b[f'mc1_{amm}'.strip()])
                    if b[f'mc2_{amm}'] != '' or ' ':
                        qd.append(b[f'mc2_{amm}'.strip()])
                    if b[f'mc3_{amm}'] != '' or ' ':
                        qd.append(b[f'mc3_{amm}'.strip()])
                    if b[f'mc4_{amm}'] != '' or ' ':
                        qd.append(b[f'mc4_{amm}'.strip()])
                    if b[f'mc5_{amm}'] != '' or ' ':
                        qd.append(b[f'mc5_{amm}'.strip()])
                    if b[f'mc6_{amm}'] != '' or ' ':
                        qd.append(b[f'mc6_{amm}'.strip()])
                    qd = [i for i in qd if i != '']
                    qd = json.dumps(qd)
                    ca = b[f'question_answer_fr_{amm}']
                if b[f'type_{amm}'] == 'True/False':
                    qd = b[f't/f_{amm}']
                    if qd == 'yes':
                        qd = 'no'
                        ca = 'yes'
                    else:
                        qd = 'no'
                        ca = 'no'
                f = add_question(b[f'question_name{amm}'], qd, ca, q.uid,
                                 b[f'type_{amm}'], str(b[f'ammount_of_{amm}']))
                amm += 1
            else:
                print('false')
                x = False
        return render_template('success.html', b=True)

    return render_template('create.html', b=True)

@quiz.route('/quihz/<a>', methods=["POST","GET"])
def quihz(a):
  a = json.loads(a)
  gq(a)
  return render_template('quiz.html',name=a['name'],owner=a['owner'])

@quiz.route('/search', methods=["POST"])
def search():
    qz = request.form['search']
    q = get_quiz(qz)
    qu = []
    for i in q:
        qu.append([i.name, i.owner_name])
    qu = json.dumps(qu)
    print(qu)
    return render_template('search.html', p=qu)


@quiz.route('/take', methods=["POST", "GET"])
def take():
    return render_template('take.html')
