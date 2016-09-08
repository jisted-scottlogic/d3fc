import { scaleIdentity } from 'd3-scale';
import { select } from 'd3-selection';
import { dataJoin } from 'd3fc-data-join';
import { shapeBar } from 'd3fc-shape';
import constant from './constant';

export default () => {

    let xScale = scaleIdentity();
    let yScale = scaleIdentity();
    let orient = 'horizontal';
    let fromValue = d => d.from;
    let toValue = d => d.to;
    let decorate = () => {};

    const join = dataJoin('g', 'annotation-band');

    const pathGenerator = shapeBar()
      .horizontalAlign('right')
      .verticalAlign('top')
      // a null value returned by a value accessor will be replaced by the scale's range
      .x((...args) => orient === 'horizontal' ? xScale.range()[0] : xScale(fromValue(...args)))
      .y((...args) => orient === 'horizontal' ? yScale(fromValue(...args)) : yScale.range()[0])
      .width((...args) => {
          const values = orient === 'horizontal' ? xScale.range() : [xScale(fromValue(...args)), xScale(toValue(...args))];
          return values[1] - values[0];
      })
      .height((...args) => {
          const values = orient === 'horizontal' ? [yScale(fromValue(...args)), yScale(toValue(...args))] : yScale.range();
          return values[1] - values[0];
      });

    var instance = (selection) => {

        if (orient !== 'horizontal' && orient !== 'vertical') {
            throw new Error('Invalid orientation');
        }

        selection.each((data, index, nodes) => {

            var g = join(select(nodes[index]), data);

            g.enter()
                .append('path')
                .classed('band', true);

            g.classed(orient, true);

            g.select('path')
                // the path generator is being used to render a single path, hence
                // an explicit index is provided
                .attr('d', (d, i) => pathGenerator([d], i));

            decorate(g, data, index);
        });
    };

    instance.xScale = (...args) => {
        if (!args.length) {
            return xScale;
        }
        xScale = args[0];
        return instance;
    };
    instance.yScale = (...args) => {
        if (!args.length) {
            return yScale;
        }
        yScale = args[0];
        return instance;
    };
    instance.orient = (...args) => {
        if (!args.length) {
            return orient;
        }
        orient = args[0];
        return instance;
    };
    instance.decorate = (...args) => {
        if (!args.length) {
            return decorate;
        }
        decorate = args[0];
        return instance;
    };
    instance.fromValue = (...args) => {
        if (!args.length) {
            return fromValue;
        }
        fromValue = constant(args[0]);
        return instance;
    };
    instance.toValue = (...args) => {
        if (!args.length) {
            return toValue;
        }
        toValue = constant(args[0]);
        return instance;
    };

    return instance;
};