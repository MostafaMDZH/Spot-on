import Snackbar from 'awesome-snackbar'

export default class utils{

    //numberWithCommas:
    static numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    //getSnackbarOptions:
    static getSnackbarOptions = (isDarkMode) => {
        return {
            position: 'top-center',
            theme: (isDarkMode === 'Yes' ? 'dark' : 'light'),
            style: {
                message: [
                    ['font-size', '1.5rem']
                ]
            },
            waitForEvent: false
        }
    }

    //copyTextToClipboard:
	static copyTextToClipboard = (text, isDarkMode) => {
		if(navigator.clipboard)
			navigator.clipboard.writeText(text).then(function(){
                new Snackbar('Email copied 👍', utils.getSnackbarOptions(isDarkMode));
			},function(err){
                new Snackbar('Cannot copy 👎', utils.getSnackbarOptions(isDarkMode));
			});
		else
            new Snackbar('Cannot copy 👎', utils.getSnackbarOptions(isDarkMode));
	}

}