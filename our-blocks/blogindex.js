wp.blocks.registerBlockType('ourblocktheme/blogindex', {
    title: "F.U",
        edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "BlogIndex placeholder")
    },
    save: function (){
        null
    }
})