from flask import Flask, render_template, jsonify, request
import math

app = Flask(__name__)

# Exemplo de dados estáticos para cidades e rotas
cidades = {
    "Cidade1": [
        {"rota": "Centro - Bairro A", "horarios": ["08:00", "12:00", "18:00"]},
        {"rota": "Centro - Bairro B", "horarios": ["09:00", "13:00", "19:00"]}
    ],
    "Cidade2": [
        {"rota": "Centro - Bairro C", "horarios": ["10:00", "14:00", "20:00"]}
    ]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rotas/<cidade>', methods=['GET'])
def obter_rotas(cidade):
    rotas = cidades.get(cidade, [])
    return jsonify(rotas)

@app.route('/distancia', methods=['POST'])
def calcular_distancia():
    data = request.json
    ponto_usuario = data['ponto_usuario']  # Coordenadas do usuário
    ponto_onibus = data['ponto_onibus']    # Coordenadas do ônibus
    distancia = haversine(ponto_usuario, ponto_onibus)
    return jsonify({"distancia": distancia})

def haversine(coord1, coord2):
    # Fórmula de Haversine para calcular distância entre dois pontos geográficos
    R = 6371.0  # Raio da Terra em km

    lat1, lon1 = math.radians(coord1[0]), math.radians(coord1[1])
    lat2, lon2 = math.radians(coord2[0]), math.radians(coord2[1])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distancia = R * c
    return distancia

if __name__ == '__main__':
    app.run(debug=True)
