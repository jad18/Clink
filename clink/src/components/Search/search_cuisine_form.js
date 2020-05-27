import SearchGeneralForm from './search_general_form.js';

class SearchCuisineForm extends SearchGeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/search/cuisines");
    }
}

export default SearchCuisineForm;