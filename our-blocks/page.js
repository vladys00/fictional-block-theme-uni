wp.blocks.registerBlockType('ourblocktheme/page', {
    title: "F.U Single Page",
    edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Single Page placeholder")
    },
    save: function (){
        null
    }
})