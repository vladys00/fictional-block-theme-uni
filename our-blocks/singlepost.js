wp.blocks.registerBlockType('ourblocktheme/singlepost', {
    title: "F.U Single Post",
    edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Single Post placeholder")
    },
    save: function (){
        null
    }
})