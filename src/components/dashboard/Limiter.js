import React from 'react'
import PropTypes from 'prop-types'

const Limiter = ({limiter, setNewLimiter}) => {
  return (
    <form className='form-inline'>
            <label htmlFor='limiter' className='mr-2'>
              Показывать по
            </label>
            <select
              name='limiter'
              id='limiter'
              className='custom-select'
              value={limiter}
              onChange={(e) => setNewLimiter(e)}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </form>
  )
}

Limiter.propTypes = {
  limiter: PropTypes.string.isRequired,
  setNewLimiter: PropTypes.func.isRequired,
}

export default Limiter
