import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import MenuItem from '../components/menu-items/menu-items'
import { selectDirectorySections } from '../reducers/directorySelector'

import './directory.styles.scss'

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionsProps }) => (
      <MenuItem key={id} {...otherSectionsProps} />
    ))}
  </div>
)
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
})

export default connect(mapStateToProps)(Directory)
