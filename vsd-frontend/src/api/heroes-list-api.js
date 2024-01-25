import { api } from '../shared/services'

/**
 *
 * @param {*} params (email, password)
 * @description: Chamada a API para login
 */
const login = async (params) => {
  try {
    const result = await api.post('/login', params)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 *
 * @param {*} params (name, email, password)
 * @description: Chamada a API para cadastro
 */
const signUp = async (params) => {
  try {
    const result = await api.post('/users', params)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para esqueci minha senha
 * @param {*} params (email)
 */
const forgotPassword = async (params) => {
  try {
    const result = await api.post('/users/forgot', params)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para resetar a senha
 * @param {*} params (password, token)
 */
const resetPassword = async (params) => {
  try {
    console.log(params)
    const result = await api.patch(
      `/users/reset-password/${params.token.token}`,
      {
        password: params.password,
      },
    )

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para fazer o upload de imagem
 * @param {*} params (avatar)
 */
const uploadImage = async (avatar) => {
  try {
    const result = await api.patch('users/avatar', avatar)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para atualizar dados do usúario
 * @param {*} params (userData)
 */
const updateUserData = async (userData) => {
  try {
    const result = await api.put(`/users/${userData.id}`, userData)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para mostrar todas as listas do usúario logado
 *
 * @param {*} params (userData)
 */
const getAllLists = async () => {
  try {
    const result = await api.get('/lists')

    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para mostrar os dados de uma lista do usuario
 *
 * @param {*} params (userData)
 */
const getList = async (listId) => {
  try {
    const result = await api.get(`/lists/${listId}`, listId)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para mostrar as listas do usuario
 *
 * @param {*} params (userData)
 */
const getListsByUser = async () => {
  try {
    const result = await api.get(`/lists`)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para mostrar dados de uma lista especifica
 *
 * @param {*} params (userData)
 */
const createList = async (data) => {
  try {
    const result = await api.post(`/lists`, data)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para deletar uma lista
 *
 * @param {*} params (userData)
 */
const deleteList = async (listId) => {
  try {
    await api.delete(`/lists/${listId}`)
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para mostrar e buscar herois
 *
 * @param {*} params (userData)
 */
const getHeroes = async (nameStartsWith) => {
  try {
    let queryString = ''
    if (nameStartsWith !== undefined) {
      queryString = `nameStartsWith=${nameStartsWith}`
    }

    const response = await api.get(`/lists/all?${queryString}`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para mostrar e buscar umm heroi
 *
 * @param {*} params (userData)
 */
const getHero = async (heroId) => {
  try {
    const response = await api.get(`/lists/hero?heroId=${heroId}`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para editar uma lista
 *
 * @param {*} params (userData)
 */
const updateList = async (list, listId) => {
  try {
    console.log(list, listId)
    const response = await api.put(`/lists/${listId}`, list)

    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  login,
  signUp,
  forgotPassword,
  resetPassword,
  uploadImage,
  updateUserData,
  getAllLists,
  createList,
  deleteList,
  getList,
  getHeroes,
  getHero,
  updateList,
  getListsByUser,
}
