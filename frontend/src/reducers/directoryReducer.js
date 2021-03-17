const INITIAL_STATE = {
  sections: [
    {
      title: 'Yoga and Fitness',
      image: '/ZingImages/Categories/simplyyoga.jpg',
      size: 'large',
      linkUrl: `collection/list`,
    },
    {
      title: 'Wellness',
      image: '/ZingImages/Categories/well-being.jpg',
      size: 'large',
      linkUrl: 'Wellness',
    },
  ],
}

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default directoryReducer
