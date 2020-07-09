from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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

@app.errorhandler(404)
def error404(e):
    return render_template('error.html'), 404

@app.errorhandler(405)
def error405(e):
    return render_template('error.html'), 405

if __name__ == '__main__':
   app.run(debug = True)
