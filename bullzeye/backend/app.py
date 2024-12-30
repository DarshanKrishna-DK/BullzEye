from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

def get_stock_details(ticker_symbol):
    """
    Fetches stock data and returns details such as current price, 52-week low, 52-week high, and other stats.
    :param ticker_symbol: Stock ticker symbol, e.g., 'AAPL' for Apple.
    :return: A dictionary containing stock details.
    """
    # Fetch stock data
    stock = yf.Ticker(ticker_symbol)
    stock_info = stock.info

    # Extract relevant details
    stock_details = {
        "Current Price": stock_info.get("currentPrice"),
        "52 Week Low": stock_info.get("fiftyTwoWeekLow"),
        "52 Week High": stock_info.get("fiftyTwoWeekHigh"),
        "Day's Low": stock_info.get("dayLow"),
        "Day's High": stock_info.get("dayHigh"),
        "Previous Close": stock_info.get("previousClose"),
        "Open Price": stock_info.get("open"),
        "Market Cap": stock_info.get("marketCap"),
        "Volume": stock_info.get("volume"),
    }

    return stock_details

@app.route('/api/stock/<string:ticker>', methods=['GET'])
def stock_details(ticker):
    """
    Flask endpoint to fetch stock details for a given ticker symbol.
    :param ticker: Stock ticker symbol, passed as a URL parameter.
    :return: JSON response containing stock details.
    """
    try:
        details = get_stock_details(ticker)
        return jsonify(details)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

