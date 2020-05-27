import GeneralForm from './general_form.js';

class SportsForm extends GeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/change_profile/sports");
    }
}

export default SportsForm;