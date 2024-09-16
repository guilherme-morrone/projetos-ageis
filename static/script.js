// Definir coordenadas para cada cidade
const coordenadasCidades = {
    "Cidade1": {
        "usuario": [-23.55052, -46.633308],  // São Paulo
        "onibus": [-23.559616, -46.658527]   // Localização simulada do ônibus em São Paulo
    },
    "Cidade2": {
        "usuario": [-22.906847, -43.172896],  // Rio de Janeiro
        "onibus": [-22.9165, -43.1965]        // Localização simulada do ônibus no Rio de Janeiro
    }
};

// Inicializa o mapa com Leaflet
let map = L.map('map').setView(coordenadasCidades["Cidade1"]["usuario"], 13);  // Inicia com a cidade 1 (SP)

// Adiciona camada de mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Marcadores para posição do usuário e ônibus
let markerUsuario = L.marker(coordenadasCidades["Cidade1"]["usuario"]).addTo(map).bindPopup('Você está aqui.');
let markerOnibus = L.marker(coordenadasCidades["Cidade1"]["onibus"]).addTo(map).bindPopup('Ônibus está aqui.');

function obterRotas() {
    const cidade = document.getElementById("cidade").value;
    fetch(`/rotas/${cidade}`)
        .then(response => response.json())
        .then(data => {
            let rotasDiv = document.getElementById("rotas");
            rotasDiv.innerHTML = "";  // Limpa o conteúdo anterior
            data.forEach(rota => {
                rotasDiv.innerHTML += `<p>Rota: ${rota.rota} - Horários: ${rota.horarios.join(", ")}</p>`;
            });

            // Atualizar coordenadas com base na cidade selecionada
            const coordenadasUsuario = coordenadasCidades[cidade]["usuario"];
            const coordenadasOnibus = coordenadasCidades[cidade]["onibus"];

            // Atualizar a posição dos marcadores no mapa
            markerUsuario.setLatLng(coordenadasUsuario).bindPopup('Você está aqui.');
            markerOnibus.setLatLng(coordenadasOnibus).bindPopup('Ônibus está aqui.');

            // Centralizar o mapa nas novas coordenadas do usuário
            map.setView(coordenadasUsuario, 13);
        });
}

function calcularDistancia() {
    const cidade = document.getElementById("cidade").value;

    // Pega as coordenadas da cidade selecionada
    const ponto_usuario = coordenadasCidades[cidade]["usuario"];
    const ponto_onibus = coordenadasCidades[cidade]["onibus"];

    fetch('/distancia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ponto_usuario: ponto_usuario,
            ponto_onibus: ponto_onibus
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('distancia').innerText = `Distância até o ponto: ${data.distancia.toFixed(2)} km`;
    });
}
