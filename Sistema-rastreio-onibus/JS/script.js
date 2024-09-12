function initMap() {
    // Centralizando o mapa em uma localização específica (por exemplo, uma cidade)
    var cityLocation = { lat: -23.55052, lng: -46.633308 }; // Exemplo: São Paulo, Brasil
    
    // Criando o mapa e centralizando na localização definida
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: cityLocation
    });

    // Exemplo de marcador
    var marker = new google.maps.Marker({
        position: cityLocation,
        map: map,
        title: 'Transporte Público Aqui!'
    });
}
