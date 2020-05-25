import GeneralForm from './general_form.js';

class CuisineForm extends GeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/change_profile/cuisines");
    }
}

export default CuisineForm;