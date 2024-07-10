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