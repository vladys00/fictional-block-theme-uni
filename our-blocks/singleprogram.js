wp.blocks.registerBlockType('ourblocktheme/singleprogram', {
    title: "F.U Single Program",
    edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Single Program placeholder")
    },
    save: function (){
        null
    }
})