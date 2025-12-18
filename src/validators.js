/**
 * VALIDAÇÕES MELHORADAS
 */

export const validators = {
  /**
   * Email válido
   */
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return { valid: false, error: 'Email obrigatório' }
    if (!regex.test(email)) return { valid: false, error: 'Email inválido' }
    return { valid: true }
  },

  /**
   * Telefone formato Brasil
   */
  phone: (phone) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (!phone) return { valid: false, error: 'Telefone obrigatório' }
    if (cleanPhone.length < 10) return { valid: false, error: 'Telefone inválido' }
    if (cleanPhone.length > 11) return { valid: false, error: 'Telefone inválido' }
    return { valid: true }
  },

  /**
   * Nome válido
   */
  name: (name) => {
    if (!name) return { valid: false, error: 'Nome obrigatório' }
    if (name.length < 3) return { valid: false, error: 'Nome deve ter pelo menos 3 caracteres' }
    if (name.length > 100) return { valid: false, error: 'Nome muito longo' }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) return { valid: false, error: 'Nome inválido' }
    return { valid: true }
  },

  /**
   * Discord username
   */
  discord: (discord) => {
    if (!discord) return { valid: false, error: 'Discord obrigatório' }
    if (discord.length < 3) return { valid: false, error: 'Discord inválido' }
    if (discord.length > 32) return { valid: false, error: 'Discord muito longo' }
    if (!/^[a-zA-Z0-9_-]+$/.test(discord)) return { valid: false, error: 'Discord contém caracteres inválidos' }
    return { valid: true }
  },

  /**
   * Preço válido
   */
  price: (price) => {
    if (!price) return { valid: false, error: 'Preço obrigatório' }
    if (isNaN(price) || price < 0) return { valid: false, error: 'Preço inválido' }
    if (price > 999999) return { valid: false, error: 'Preço muito alto' }
    return { valid: true }
  },

  /**
   * Quantidade
   */
  quantity: (quantity) => {
    if (!quantity || quantity < 1) return { valid: false, error: 'Quantidade deve ser pelo menos 1' }
    if (quantity > 1000) return { valid: false, error: 'Quantidade muito alta' }
    if (!Number.isInteger(Number(quantity))) return { valid: false, error: 'Quantidade deve ser um número inteiro' }
    return { valid: true }
  },

  /**
   * CEP formato Brasil
   */
  zipCode: (zipCode) => {
    const cleanZip = zipCode.replace(/\D/g, '')
    if (!zipCode) return { valid: false, error: 'CEP obrigatório' }
    if (cleanZip.length !== 8) return { valid: false, error: 'CEP deve ter 8 dígitos' }
    return { valid: true }
  },

  /**
   * Endereço
   */
  address: (address) => {
    if (!address) return { valid: false, error: 'Endereço obrigatório' }
    if (address.length < 10) return { valid: false, error: 'Endereço muito curto' }
    if (address.length > 200) return { valid: false, error: 'Endereço muito longo' }
    return { valid: true }
  },

  /**
   * Cidade
   */
  city: (city) => {
    if (!city) return { valid: false, error: 'Cidade obrigatória' }
    if (city.length < 2) return { valid: false, error: 'Cidade inválida' }
    if (city.length > 100) return { valid: false, error: 'Cidade muito longa' }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(city)) return { valid: false, error: 'Cidade inválida' }
    return { valid: true }
  },

  /**
   * Estado (UF)
   */
  state: (state) => {
    const validStates = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
    if (!state) return { valid: false, error: 'Estado obrigatório' }
    if (state.length !== 2) return { valid: false, error: 'Estado deve ter 2 caracteres' }
    if (!validStates.includes(state.toUpperCase())) return { valid: false, error: 'Estado inválido' }
    return { valid: true }
  }
}

/**
 * Validar formulário de entrega completo
 */
export const validateDeliveryForm = (data) => {
  const errors = {}

  // Nome
  const nameValidation = validators.name(data.nome || '')
  if (!nameValidation.valid) errors.nome = nameValidation.error

  // Email
  const emailValidation = validators.email(data.email || '')
  if (!emailValidation.valid) errors.email = emailValidation.error

  // Telefone
  const phoneValidation = validators.phone(data.telefone || '')
  if (!phoneValidation.valid) errors.telefone = phoneValidation.error

  // Discord
  const discordValidation = validators.discord(data.discord || '')
  if (!discordValidation.valid) errors.discord = discordValidation.error

  // Endereço (opcional)
  if (data.endereco && data.endereco.length > 0) {
    const addressValidation = validators.address(data.endereco)
    if (!addressValidation.valid) errors.endereco = addressValidation.error
  }

  // Cidade (opcional)
  if (data.cidade && data.cidade.length > 0) {
    const cityValidation = validators.city(data.cidade)
    if (!cityValidation.valid) errors.cidade = cityValidation.error
  }

  // CEP (opcional)
  if (data.cep && data.cep.length > 0) {
    const zipValidation = validators.zipCode(data.cep)
    if (!zipValidation.valid) errors.cep = zipValidation.error
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Formatar telefone para display
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`
  }
  return phone
}

/**
 * Formatar CEP
 */
export const formatZipCode = (zip) => {
  const cleaned = zip.replace(/\D/g, '')
  if (cleaned.length === 8) {
    return `${cleaned.substring(0, 5)}-${cleaned.substring(5)}`
  }
  return zip
}

/**
 * Remover formatação
 */
export const unformat = (value) => {
  return value.replace(/\D/g, '')
}
