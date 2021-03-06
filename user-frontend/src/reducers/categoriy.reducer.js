import { GET_ALL_CATEGORIES_SUCCESS } from '../actions/category/catergory.types'

const initState = {
  categories: [],
  loading: false,
  error: null,
}

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = []

  if (parentId === undefined) {
    return [
      ...category,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ]
  }

  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  type: category.type,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      })
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children > 0
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

    default:
      return state
  }
}
