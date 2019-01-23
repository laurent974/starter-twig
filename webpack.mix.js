let mix = require('laravel-mix');

mix.setPublicPath('/');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

mix.js('app/js/app.js', 'public/bundle.js')
  .sass('app/scss/style.scss', 'style.css')
  .options({
    processCssUrls: false
  })
  // .copyDirectory('app/assets/fonts/**/*.*', 'public/fonts')
  .webpackConfig({
    module: {
      rules: [{
        test: /\.twig$/,
        loader: 'twig-loader'
      }]
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: 'app/assets/images',
        to: 'public/img', // Laravel mix will place this in 'public/img'
      }]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        plugins: [
          imageminMozjpeg({
            quality: 80,
          })
        ]
      })
    ]
  });