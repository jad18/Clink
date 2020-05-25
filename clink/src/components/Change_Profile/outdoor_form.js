import GeneralForm from './general_form.js';

class OutdoorForm extends GeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/change_profile/outdoor_activities");
    }
}

export default OutdoorForm;