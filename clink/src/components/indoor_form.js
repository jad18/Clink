import GeneralForm from './general_form.js';

class IndoorForm extends GeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/change_profile/indoor_activities");
    }
}

export default IndoorForm;