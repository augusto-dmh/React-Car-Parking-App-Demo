import PropTypes from 'prop-types'

function ValidationError({ errors, field }) {
    if (errors[field]?.length) return (
        <div className="alert alert-danger" role="alert">
            <ul>
                { errors[field].map((error, index) => {
                    return (<li key={ index }>{ error }</li>)
                }) }
            </ul>
        </div>
    )
}

ValidationError.propTypes = {
    errors: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
}

export default ValidationError