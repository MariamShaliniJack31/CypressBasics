test:rs_meta:product == label[class='ml-2 mt-1']>span
    
    SNO
        label.ml-2[for='SNO']:nth-child(2)
        table.p-treetable-table>tbody>tr>td>label.ml-2[for='SNO']:nth-child(2)

        PROPERTY NAME ==== ATTR_SNO, DATA_TYPE, DATA_LENGTH, DATA_SCALE, NULLABLE, GENERIC_TYPE: 
        div[class='column']>div>div[class='p-treetable p-component']>div[class='p-treetable-wrapper']>table.p-treetable-table>tbody.p-treetable-tbody>tr[tabindex='0']>td:nth-child(2)

        SOURCE VALUE ===== 1 , INTEGER, 32, Y, NUMBER
        div[class='column']>div>div[class='p-treetable p-component']>div[class='p-treetable-wrapper']>table.p-treetable-table>tbody.p-treetable-tbody>tr[tabindex='0']>td:nth-child(3)

        TARGET VALUE ==== 
        div[class='column']>div>div[class='p-treetable p-component']>div[class='p-treetable-wrapper']>table.p-treetable-table>tbody.p-treetable-tbody>tr[tabindex='0']>td:nth-child(4)

    CAT
        label.ml-2[for='CAT']:nth-child(2)

    DATE
        label.ml-2[for='DATE']:nth-child(2)

    COMPANY    
        label.ml-2[for='COMPANY']:nth-child(2)

    CITY
        label.ml-2[for='CITY']:nth-child(2)

    PHONE
        label.ml-2[for='PHONE']:nth-child(2)

    DEVICE
        label.ml-2[for='DEVICE']:nth-child(2)



test:rs_meta:customerdata  == label[class='ml-2 mt-1']>span
    
    CUST_NO (Same for other tables also, but change Attribute Name)
        table.p-treetable-table>tbody>tr>td>label.ml-2[for='CUST_NO']:nth-child(2)
        label.ml-2[for='CUST_NO']:nth-child(2)
    
    PROPERTY NAME, SOURCE VALUE, TARGET VALUE : Same as Above Table

    