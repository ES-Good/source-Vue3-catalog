export async function  fetchAllCategoryProduct(nameCategory ,cityId) {

    let data = await fetch(`https://nlstar.com/ru/api/catalog3/v1/menutags/${nameCategory}/?city_id=${cityId}`);
    let res = await data.json()

    return res

    // fetch(`https://nlstar.com/ru/api/catalog3/v1/menutags/${nameCategory}/?city_id=${cityId}`)
    //     .then(response => response.json())
    //     .then(data => {

    //         return data;

    //     })
}