wp.blocks.registerBlockType('ourblocktheme/footer', {
    title: "FU Footer",
    edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Footer placeholder")
    },
    save: function (){
        null
    }
})