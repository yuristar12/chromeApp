export const GetTabsIdByUrl = async (url: string) => {
    let id = null;
    const tabsList = await chrome.tabs.query({});
    // console.log(tabsList);
    if (Array.isArray(tabsList)) {
        for (let i = 0; i < tabsList.length; i++) {
            const item = tabsList[i];
            if (item.url!.indexOf(url) > -1) {
                id = item.id;
                break;
            }
        }
    }
    return id;


}

export const GetRangeByRandom = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const Sleep = async (time: number) => {

    return new Promise((resolve) => {

        setInterval(() => {
            resolve(true);
        }, time);

    })

}
