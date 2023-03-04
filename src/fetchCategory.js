export async function  fetchAllCategoryProduct(nameCategory ,cityId) {

    let data = await fetch(`https://nlstar.com/ru/api/catalog3/v1/menutags/${nameCategory}/?city_id=${cityId}`);
    let res = await data.json()

    res.products.forEach(element => {
        element.loadImg = false
    });


    let item = {
        name: 'Все продукты',
        slug: 'AllCategories',
        click: true,
        id: 'AllCategories',
    };

    res.tags.unshift(item)

    res.tags.forEach(element => {
        element.click = false
    });

    return res
}