import SearchGeneralForm from './search_general_form.js';

class SearchOutdoorForm extends SearchGeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/search/outdoor_activities");
    }
}

export default SearchOutdoorForm;