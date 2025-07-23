wp.blocks.registerBlockType('ourblocktheme/programarchive', {
    title: "F.U Program Archive",
    edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Program Archive placeholder")
    },
    save: function (){
        null
    }
})