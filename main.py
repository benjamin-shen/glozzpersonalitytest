from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/results', methods=['POST'])
def results():
    from backend import results
    return results.result()

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/sorry')
def sorry():
    return render_template('sorry.html')

if __name__ == '__main__':
   app.run(debug = True)
