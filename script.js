// Dados dos pontos turísticos para o modal
const touristSpotsData = {
  "morro-cristo": {
    name: "Morro do Cristo",
    icon: "🏔️",
    category: "Mirante",
    difficulty: "Moderada",
    image: "images/morro-do-cristo.jpg",
    description:
      "Mirante com vista panorâmica de 360° da cidade e baía. Local perfeito para contemplar o pôr do sol e fazer fotos incríveis da região.",
    visitTime: "1-2 horas",
    bestTime: "Pôr do sol (17h-19h)",
    highlights: ["Vista panorâmica", "Pôr do sol", "Fotografia", "Trilha"],
    tips: "Leve água e use calçados confortáveis. A subida tem cerca de 20 minutos de caminhada.",
    coordinates: { lat: -25.8756, lng: -48.5689 },
  },
  "igreja-matriz": {
    name: "Igreja Matriz São Pedro",
    icon: "🏛️",
    category: "Histórico",
    difficulty: "Fácil",
    image: "images/igreja-matriz.jpg",
    description:
      "Marco histórico da cidade construído em 1940, com arquitetura tradicional e importância cultural para a comunidade local.",
    visitTime: "30 minutos",
    bestTime: "Manhã (9h-11h)",
    highlights: ["Arquitetura histórica", "Arte sacra", "Cultura local", "Fotografia"],
    tips: "Respeite os horários de missa. Entrada gratuita, mas contribuições são bem-vindas.",
    coordinates: { lat: -25.8834, lng: -48.5756 },
  },
  "ferry-boat": {
    name: "Ferry Boat",
    icon: "⛵",
    category: "Transporte Histórico",
    difficulty: "Fácil",
    image: "images/ferry-boat.jpg",
    description:
      "Travessia tradicional que conecta Guaratuba a Matinhos, oferecendo uma experiência única aos visitantes com vista da baía.",
    visitTime: "30 minutos (travessia)",
    bestTime: "Manhã (8h-10h)",
    highlights: ["Vista da baía", "Experiência histórica", "Transporte tradicional", "Fotografia"],
    tips: "Funciona de acordo com a maré. Consulte horários antes de ir. Leve documento.",
    coordinates: { lat: -25.8798, lng: -48.5723 },
  },
  "baia-guaratuba": {
    name: "Baía de Guaratuba",
    icon: "🌿",
    category: "Natural",
    difficulty: "Fácil",
    image: "images/baia-guaratuba.jpg",
    description:
      "Encontro do rio com o mar, formando uma paisagem única. Ideal para passeios de barco, pesca esportiva e contemplação.",
    visitTime: "2-4 horas",
    bestTime: "Manhã (7h-10h)",
    highlights: ["Encontro rio-mar", "Passeios de barco", "Pesca", "Vida marinha"],
    tips: "Contrate passeios com operadoras locais. Melhor época: março a novembro.",
    coordinates: { lat: -25.8801, lng: -48.5712 },
  },
  "mercado-municipal": {
    name: "Mercado Municipal",
    icon: "🎭",
    category: "Cultural",
    difficulty: "Fácil",
    image: "images/mercado-municipal.jpg",
    description:
      "Centro de comércio local com produtos típicos, artesanatos e frutos do mar frescos. Experiência autêntica da cultura guaratubense.",
    visitTime: "1 hora",
    bestTime: "Manhã (6h-12h)",
    highlights: ["Produtos locais", "Artesanato", "Frutos do mar", "Cultura local"],
    tips: "Funciona principalmente pela manhã. Leve dinheiro em espécie para melhores preços.",
    coordinates: { lat: -25.8845, lng: -48.5734 },
  },
  "parque-saint-hilaire": {
    name: "Parque Nacional Saint-Hilaire",
    icon: "🌿",
    category: "Natural",
    difficulty: "Moderada a Difícil",
    image: "images/parque-saint-hilaire.jpg",
    description: "Área de preservação com trilhas ecológicas, cachoeiras e rica biodiversidade da Mata Atlântica.",
    visitTime: "3-5 horas",
    bestTime: "Manhã (8h-12h)",
    highlights: ["Trilhas ecológicas", "Cachoeiras", "Mata Atlântica", "Observação de fauna"],
    tips: "Necessário guia local. Use repelente e leve água. Consulte condições climáticas.",
    coordinates: { lat: -25.8923, lng: -48.5456 },
  },
}

// Variáveis globais
let currentModal = null

// Funções utilitárias
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "Fácil":
      return "badge-success"
    case "Moderada":
      return "badge-warning"
    case "Moderada a Difícil":
      return "badge-warning"
    case "Difícil":
      return "badge-danger"
    default:
      return "badge-secondary"
  }
}

function copyCoordinates(lat, lng) {
  const text = `${lat}, ${lng}`
  navigator.clipboard.writeText(text).then(() => {
    alert("Coordenadas copiadas para a área de transferência!")
  })
}

function openInGoogleMaps(lat, lng) {
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")
}

// Funções de modal
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    currentModal = modal
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  if (currentModal) {
    currentModal.classList.remove("active")
    currentModal = null
    document.body.style.overflow = "auto"
  }
}

// Funções de menu mobile
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu")
  const overlay = document.getElementById("overlay")

  if (menu && overlay) {
    menu.classList.toggle("active")
    overlay.classList.toggle("active")
  }
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu")
  const overlay = document.getElementById("overlay")

  if (menu && overlay) {
    menu.classList.remove("active")
    overlay.classList.remove("active")
  }
}

// Função para filtrar restaurantes
function filterRestaurants(category, buttonElement) {
  // Atualizar botões ativos
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((btn) => btn.classList.remove("active"))
  buttonElement.classList.add("active")

  // Filtrar cards
  const restaurantCards = document.querySelectorAll(".restaurant-card")
  restaurantCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category")
    if (category === "Todos" || cardCategory === category) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Função para filtrar pontos turísticos
function filterSpots(category, buttonElement) {
  // Atualizar botões ativos
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((btn) => btn.classList.remove("active"))
  buttonElement.classList.add("active")

  // Filtrar cards
  const spotCards = document.querySelectorAll(".spot-card")
  spotCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category")
    if (category === "Todos" || cardCategory === category) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Função para abrir modal do ponto turístico
function openSpotModal(spotId) {
  const spot = touristSpotsData[spotId]
  if (!spot) return

  const modal = document.getElementById("spotModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  modalTitle.innerHTML = `${spot.icon} ${spot.name}`

  modalBody.innerHTML = `
    <img src="${spot.image}" alt="${spot.name}" style="width: 100%; height: 16rem; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1.5rem;">

    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
      <span class="badge badge-primary">${spot.category}</span>
      <span class="badge ${getDifficultyColor(spot.difficulty)}">${spot.difficulty}</span>
    </div>

    <p style="color: #64748b; line-height: 1.6; margin-bottom: 1.5rem;">${spot.description}</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div>
        <div style="display: flex; align-items: center; font-size: 0.875rem; margin-bottom: 0.5rem;">
          🕒 <span style="font-weight: 500; margin-left: 0.5rem;">Tempo de visita:</span>
          <span style="margin-left: 0.25rem;">${spot.visitTime}</span>
        </div>
        <div style="display: flex; align-items: center; font-size: 0.875rem;">
          📷 <span style="font-weight: 500; margin-left: 0.5rem;">Melhor horário:</span>
          <span style="margin-left: 0.25rem;">${spot.bestTime}</span>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">Destaques:</h4>
      <div class="tags-container">
        ${spot.highlights.map((highlight) => `<span class="tag">${highlight}</span>`).join("")}
      </div>
    </div>

    <div class="coordinates-container" style="margin-bottom: 1.5rem;">
      <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">Dicas importantes:</h4>
      <p style="font-size: 0.875rem; color: #64748b;">${spot.tips}</p>
    </div>

    <div class="coordinates-container">
      <h4 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">Coordenadas:</h4>
      <div class="coordinates-display">
        <span class="coordinates-text">${spot.coordinates.lat}, ${spot.coordinates.lng}</span>
        <button class="btn btn-outline btn-sm" onclick="copyCoordinates(${spot.coordinates.lat}, ${spot.coordinates.lng})">
          📋
        </button>
      </div>
    </div>

    <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
      <button class="btn btn-primary" onclick="openInGoogleMaps(${spot.coordinates.lat}, ${spot.coordinates.lng})" style="flex: 1; background: #10b981;">
        🔗 Ver no Google Maps
      </button>
    </div>
  `

  openModal("spotModal")
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenuClose = document.getElementById("mobileMenuClose")
  const overlay = document.getElementById("overlay")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu)
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileMenu)
  }

  // Modal close
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal()
    }
  })

  // ESC key para fechar modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentModal) {
      closeModal()
    }
  })
})
