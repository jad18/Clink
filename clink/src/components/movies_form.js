import GeneralForm from './general_form.js';

class MoviesForm extends GeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/change_profile/movies");
    }
}

export default MoviesForm;