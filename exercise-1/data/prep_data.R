# Format data downloaded from:
# http://data.worldbank.org/data-catalog/world-development-indicators
# That data has been removed from this repository because it is quite large.

library(dplyr)
library(tidyr)
setwd('~/Documents/INFO-474/m8-d3-scales/exercise-2')
data <- read.csv("data/WDI_Data.csv")

# Read in list of countries to filter out regions/global
countries <- read.csv('data/WDI_Country.csv') %>% 
              filter(Currency.Unit != '') %>% 
              select(country_code = Country.Code, region = Region)
            
# Subset data to rows/columns of interest
variables <- c('GDP per capita (constant 2005 US$)', 'Life expectancy at birth, total (years)', 'Fertility rate, total (births per woman)')
subset <- data %>%
          filter(Indicator.Name %in% variables) %>% 
          select(country=Country.Name, country_code=Country.Code, X2014, Indicator.Name) %>% 
          spread(Indicator.Name, X2014) %>% 
          rename(gdp = `GDP per capita (constant 2005 US$)`, life_expectancy = `Life expectancy at birth, total (years)`, fertility_rate = `Fertility rate, total (births per woman)`) %>% 
          filter(!is.na(gdp), !is.na(life_expectancy), !is.na(fertility_rate)) %>% 
          inner_join(countries, by = "country_code") %>% 
          select(country, country_code, region, gdp ,life_expectancy, fertility_rate)

# Write csv
write.csv(subset, 'data/prepped_data.csv', row.names = FALSE)
