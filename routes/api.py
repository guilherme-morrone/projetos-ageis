from flask import Blueprint, jsonify, request

# Cria um Blueprint para separar as rotas de API
api = Blueprint('api', __name__)

# Dados simulados de horários e coordenadas para ônibus
bus_data = {
    "Cidade1": {
        "rotas": [
            {"rota": "Rota 101", "horarios": ["08:00", "09:00", "10:00"]},
            {"rota": "Rota 202", "horarios": ["11:00", "12:00", "13:00"]}
        ],
        "coordenadas": [-23.55052, -46.633308]
    },
    "Cidade2": {
        "rotas": [
            {"rota": "Rota 303", "horarios": ["14:00", "15:00", "16:00"]},
            {"rota": "Rota 404", "horarios": ["17:00", "18:00", "19:00"]}
        ],
        "coordenadas": [-23.559616, -46.658527]
    }
}

# Rota para obter horários e coordenadas de ônibus para uma cidade
@api.route('/dados/<cidade>', methods=['GET'])
def get_dados(cidade):
    if cidade in bus_data:
        return jsonify(bus_data[cidade])
    else:
        return jsonify({"error": "Cidade não encontrada"}), 404

# Rota para calcular distância entre o usuário e o ônibus
@api.route('/distancia', methods=['POST'])
def calcular_distancia():
    data = request.get_json()
    ponto_usuario = data.get('ponto_usuario')
    ponto_onibus = data.get('ponto_onibus')

    # Simulação de cálculo de distância simples
    # Em um cenário real, você poderia integrar com APIs de mapas, como Google Maps API
    distancia = 5.0  # Exemplo de cálculo simples
    return jsonify({"distancia": distancia})
