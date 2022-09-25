export default class utils{

    //numberWithCommas:
    static numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


}