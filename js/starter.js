let Counter = React.createClass({
        getInitialState: function() {
            return {
                counter: 0
            };
        },
        render: function() {
            return <div>
                <h2>{this.props.name}</h2>
                {this.state.counter}
            </div>;
        }
});

ReactDOM.render(
    <Counter name="{'Counter'}" />,
    document.getElementById('container')
);
