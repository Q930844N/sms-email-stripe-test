'use strict'

const Database = use('Database');


async function getMenu(privilege_id) {
    let response = []

    try {
        let parent_menu = await this.getParentMenu(privilege_id)
        if(parent_menu.length > 0){
            for (let index = 0; index < parent_menu.length; index++) {
                const element = parent_menu[index];                
                let menu = {
                    id: '',
                    name: '',
                    type: '',
                    path: '',
                    color: '',
                    icon: '',
                    is_dashboard: '',
                    sorting: '',
                    child_menu: []
                }
                
                menu.id = element.id
                menu.name = element.name
                menu.type = element.type
                menu.path = element.path
                menu.color = element.color
                menu.icon = element.icon
                menu.is_dashboard = element.is_dashboard
                menu.sorting = element.sorting
                // menu.child_menu = await this.getChildMenu(element.id, privilege_id)
                
                let sub_menu = await this.getChildMenu(element.id, privilege_id)
                
                if(sub_menu.length > 0){  
                    for (let index = 0; index < sub_menu.length; index++) {
                        const element = sub_menu[index]
                        let c_menu = {
                            id: '',
                            name: '',
                            type: '',
                            path: '',
                            color: '',
                            icon: '',
                            is_dashboard: '',
                            sorting: ''
                        }
                        c_menu.id = element.id
                        c_menu.name = element.name
                        c_menu.type = element.type
                        c_menu.path = element.path
                        c_menu.color = element.color
                        c_menu.icon = element.icon
                        c_menu.is_dashboard = element.is_dashboard
                        c_menu.sorting = element.sorting

                        menu.child_menu.push(c_menu)
                    }
                   
                }                

                response.push(menu)
            }
            return response            
        }else{
            console.log('no data in menu')
        }
    } catch (error) {
        console.log('Service: MenuService,', 'Function: getMenu,', 'Error: ', error)
        return response.status(400).json({ error: error.message })
    }
}

async function getParentMenu(privilege_id) {
    let response = ''
    try {
        response = await Database.from('admin_menus')
            .where('is_active', 1)
            .where('parent_id', 0)
            .where('id_cms_privileges', privilege_id)
            return response
    } catch (error) {
        console.log('Service: MenuService,', 'Function: getParentMenu,', 'Error: ', error)
        return response.status(400).json({ error: error.message })
    }
}

async function getChildMenu(parent_id, privilege_id) {
    let response = ''
    try {
        response = await Database.from('admin_menus')
            .where('is_active', 1)
            .where('parent_id', parent_id)
            .where('id_cms_privileges', privilege_id)
            return response
    } catch (error) {
        console.log('Service: MenuService,', 'Function: getChildMenu,', 'Error: ', error)
        return response.status(400).json({ error: error.message })
    }
}




module.exports =  {
    getMenu,
    getParentMenu,
    getChildMenu,
}