from flask import *
from src.Config import Environment
from src.Data.Db import *
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*/*": {"origins": "*"}})
project_env = Environment()
project_env = project_env.get_env()


# ----- ARTICOLI --------------------------------------------------------------------------------------
@app.route("/api/get_artico", methods=["GET"])
def get_artico():
    artico = DataArtico()
    try:
        artico_data = artico.get_artico()
        return jsonify(status=200, data=artico_data)
    except Exception as e:
        print(e)
        return jsonify(status=500, error=e)


@app.route("/api/update_artico", methods=["POST"])
def update_artico():
    if request.json:
        artico_data = request.json["artico_data"]
        artico = DataArtico()
        try:
            artico_res = artico.update_artico(artico_data)
            if artico_res:
                return jsonify(status=200)
            else:
                return jsonify(status=500)
        except Exception as e:
            print(e)
            return jsonify(status=500, error=e)


@app.route("/api/toggle_delete_artico", methods=["POST"])
def toggle_delete_artico():
    if request.json:
        artico_data = request.json["artico_data"]
        artico = DataArtico()
        try:
            artico_res = artico.toggle_delete_artico(artico_data)
            if artico_res:
                return jsonify(status=200)
            else:
                return jsonify(status=500)
        except Exception as e:
            print(e)
            return jsonify(status=500, error=e)


@app.route("/api/add_artico", methods=["POST"])
def add_artico():
    if request.json:
        artico_data = request.json["artico_data"]
        artico = DataArtico()
        try:
            artico_res = artico.add_artico(artico_data)
            if artico_res:
                return jsonify(status=200)
            else:
                return jsonify(status=500)
        except Exception as e:
            print(e)
            return jsonify(status=500, error=e)


# -----------------------------------------------------------------------------------------------------

@app.route("/api/get_poszio", methods=["GET"])
def get_poszio():
    poszio = DataPoszio()
    try:
        poszio_data = poszio.get_poszio()
        return jsonify(status=200, data=poszio_data)
    except Exception as e:
        print(e)
        return jsonify(status=500, error=e)


@app.route("/api/get_dipend", methods=["GET"])
def get_dipend():
    dipend = DataDipend()
    try:
        artico_data = dipend.get_dipend()
        return jsonify(status=200, data=artico_data)
    except Exception as e:
        print(e)
        return jsonify(status=500, error=e)


@app.route("/api/get_repart", methods=["GET"])
def get_repart():
    repart = DataRepart()
    try:
        repart_data = repart.get_repart()
        return jsonify(status=200, data=repart_data)
    except Exception as e:
        print(e)
        return jsonify(status=500, error=e)


if __name__ == '__main__':
    app.run(host=project_env['host'], port=project_env['port'])
