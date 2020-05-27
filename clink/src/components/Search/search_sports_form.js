import SearchGeneralForm from './search_general_form.js';

class SearchSportsForm extends SearchGeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/search/sports");
    }
}

export default SearchSportsForm;