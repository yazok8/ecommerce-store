import {
  ADD_NEW_CATEGORY_FAIL,
  ADD_NEW_CATEGORY_REQUEST,
  ADD_NEW_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from '../actions/category/catergory.types'

const initState = {
  categories: [],
  loading: false,
  error: null,
}

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = []

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ]
  }

  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      }
      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      })
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      })
    }
  }

  return myCategories
}

export const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      }
    case ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      )
      console.log('updated categories', updatedCategories)
      return {
        ...state,
        categories: updatedCategories,
        loading: false,
      }

    case ADD_NEW_CATEGORY_FAIL:
      return {
        ...initState,
        error: action.payload.error,
      }

    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      }

    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      }
    default:
      return state
  }
}
