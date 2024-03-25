class App extends Component {
	constructor(props) {
		super(props);
		this.header = new Header({
			id: 'header',
			parent: this.id,
			template: template.headerTemplate,
			callbacks: {
				showPage: (name) => this.showPage(name)
			}
		});

		this.esse = new Esse({
			id: 'esse',
			parent: this.id,
			template: template.esseTemplate
		});

		this.rpg = new RPG({
			id: 'rpg',
			parent: this.id,
			template: template.RPGTemplate
		});

		this.shooting = new Shooting({
			id: 'shooting',
			parent: this.id,
			template: template.shootingTemplate
		});

		this.calc = new Calc({
			id: 'calc',
			parent: this.id,
			template: template.calcTemplate
		});

		this.graph2D = new Graph2D({
			id: 'graph2D',
			parent: this.id,
			template: template.graph2DTemplate
		});

		this.graph3D = new Graph3D({
			id: 'graph3D',
			parent: this.id,
			template: template.graph3DTemplate
		});

		this.showPage('graph3D');
	}

	showPage(name) {
		this.calc.hide();
		this.rpg.hide();
		this.shooting.hide();
		this.graph2D.hide();
		this.graph3D.hide();
		this.esse.hide();
		if (this[name]?.show) {
			this[name].show();
		}
	}
}
