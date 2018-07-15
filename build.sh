# Copy static site
CWD=`pwd`

# Clone Pages repository
cd /tmp
git clone git@github.com:ndorfin/SouthernSunQueenBees.git build

cd build && git checkout -b gh-pages origin/gh-pages # If not using master

# Trigger Middleman rebuild
cd $CWD
bundle exec middleman contentful
bundle exec middleman build

# Push newly built repository
cp -r $CWD/build/* /tmp/build

cd /tmp/build

git config --global user.email "ndorfin+github@gmail.com"
git config --global user.name "SOKKIEBOT"

git add .
git commit -m "Automated Rebuild"
git push -f origin gh-pages
