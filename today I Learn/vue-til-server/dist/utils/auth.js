"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateUser = exports.verifyToken = exports.newToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// json related
// modules
const newToken = user => {
  const payload = {
    username: user.username,
    _id: user._id
  };
  return _jsonwebtoken.default.sign(payload, _config.SECRET_KEY, {
    expiresIn: _config.EXPIRATION_DATE
  });
};

exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.SECRET_KEY, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
}); // middleware


exports.verifyToken = verifyToken;

const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'token must be included'
    });
  }

  const token = req.headers.authorization;
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).json({
      message: 'token is invalid'
    });
  }

  const user = await _UserModel.default.findById(payload._id).select('-password').lean().exec();

  if (!user) {
    return res.status(401).json({
      message: 'user is not found'
    });
  }

  req.user = user;
  next();
};

exports.authenticateUser = authenticateUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdXRoLmpzIl0sIm5hbWVzIjpbIm5ld1Rva2VuIiwidXNlciIsInBheWxvYWQiLCJ1c2VybmFtZSIsIl9pZCIsImp3dCIsInNpZ24iLCJTRUNSRVRfS0VZIiwiZXhwaXJlc0luIiwiRVhQSVJBVElPTl9EQVRFIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidmVyaWZ5IiwiZXJyIiwiYXV0aGVudGljYXRlVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiZSIsIlVzZXJNb2RlbCIsImZpbmRCeUlkIiwic2VsZWN0IiwibGVhbiIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUpBO0FBR0E7QUFHTyxNQUFNQSxRQUFRLEdBQUdDLElBQUksSUFBSTtBQUM5QixRQUFNQyxPQUFPLEdBQUc7QUFDZEMsSUFBQUEsUUFBUSxFQUFFRixJQUFJLENBQUNFLFFBREQ7QUFFZEMsSUFBQUEsR0FBRyxFQUFFSCxJQUFJLENBQUNHO0FBRkksR0FBaEI7QUFJQSxTQUFPQyxzQkFBSUMsSUFBSixDQUFTSixPQUFULEVBQWtCSyxrQkFBbEIsRUFBOEI7QUFDbkNDLElBQUFBLFNBQVMsRUFBRUM7QUFEd0IsR0FBOUIsQ0FBUDtBQUdELENBUk07Ozs7QUFVQSxNQUFNQyxXQUFXLEdBQUdDLEtBQUssSUFDOUIsSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUMvQlQsd0JBQUlVLE1BQUosQ0FBV0osS0FBWCxFQUFrQkosa0JBQWxCLEVBQThCLENBQUNTLEdBQUQsRUFBTWQsT0FBTixLQUFrQjtBQUM5QyxRQUFJYyxHQUFKLEVBQVMsT0FBT0YsTUFBTSxDQUFDRSxHQUFELENBQWI7QUFDVEgsSUFBQUEsT0FBTyxDQUFDWCxPQUFELENBQVA7QUFDRCxHQUhEO0FBSUQsQ0FMRCxDQURLLEMsQ0FRUDs7Ozs7QUFDTyxNQUFNZSxnQkFBZ0IsR0FBRyxPQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCLEtBQTBCO0FBQ3hELE1BQUksQ0FBQ0YsR0FBRyxDQUFDRyxPQUFKLENBQVlDLGFBQWpCLEVBQWdDO0FBQzlCLFdBQU9ILEdBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQXJCLENBQVA7QUFDRDs7QUFFRCxRQUFNZCxLQUFLLEdBQUdPLEdBQUcsQ0FBQ0csT0FBSixDQUFZQyxhQUExQjtBQUNBLE1BQUlwQixPQUFKOztBQUNBLE1BQUk7QUFDRkEsSUFBQUEsT0FBTyxHQUFHLE1BQU1RLFdBQVcsQ0FBQ0MsS0FBRCxDQUEzQjtBQUNELEdBRkQsQ0FFRSxPQUFPZSxDQUFQLEVBQVU7QUFDVixXQUFPUCxHQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFyQixDQUFQO0FBQ0Q7O0FBRUQsUUFBTXhCLElBQUksR0FBRyxNQUFNMEIsbUJBQVVDLFFBQVYsQ0FBbUIxQixPQUFPLENBQUNFLEdBQTNCLEVBQ2hCeUIsTUFEZ0IsQ0FDVCxXQURTLEVBRWhCQyxJQUZnQixHQUdoQkMsSUFIZ0IsRUFBbkI7O0FBS0EsTUFBSSxDQUFDOUIsSUFBTCxFQUFXO0FBQ1QsV0FBT2tCLEdBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQXJCLENBQVA7QUFDRDs7QUFFRFAsRUFBQUEsR0FBRyxDQUFDakIsSUFBSixHQUFXQSxJQUFYO0FBQ0FtQixFQUFBQSxJQUFJO0FBQ0wsQ0F4Qk0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqc29uIHJlbGF0ZWRcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5pbXBvcnQgeyBTRUNSRVRfS0VZLCBFWFBJUkFUSU9OX0RBVEUgfSBmcm9tICcuLi9jb25maWcnO1xyXG4vLyBtb2R1bGVzXHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbC5qcyc7XHJcblxyXG5leHBvcnQgY29uc3QgbmV3VG9rZW4gPSB1c2VyID0+IHtcclxuICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXHJcbiAgICBfaWQ6IHVzZXIuX2lkLFxyXG4gIH07XHJcbiAgcmV0dXJuIGp3dC5zaWduKHBheWxvYWQsIFNFQ1JFVF9LRVksIHtcclxuICAgIGV4cGlyZXNJbjogRVhQSVJBVElPTl9EQVRFLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHZlcmlmeVRva2VuID0gdG9rZW4gPT5cclxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBqd3QudmVyaWZ5KHRva2VuLCBTRUNSRVRfS0VZLCAoZXJyLCBwYXlsb2FkKSA9PiB7XHJcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcclxuICAgICAgcmVzb2x2ZShwYXlsb2FkKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuLy8gbWlkZGxld2FyZVxyXG5leHBvcnQgY29uc3QgYXV0aGVudGljYXRlVXNlciA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIGlmICghcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogJ3Rva2VuIG11c3QgYmUgaW5jbHVkZWQnIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9rZW4gPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uO1xyXG4gIGxldCBwYXlsb2FkO1xyXG4gIHRyeSB7XHJcbiAgICBwYXlsb2FkID0gYXdhaXQgdmVyaWZ5VG9rZW4odG9rZW4pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6ICd0b2tlbiBpcyBpbnZhbGlkJyB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWQocGF5bG9hZC5faWQpXHJcbiAgICAuc2VsZWN0KCctcGFzc3dvcmQnKVxyXG4gICAgLmxlYW4oKVxyXG4gICAgLmV4ZWMoKTtcclxuXHJcbiAgaWYgKCF1c2VyKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiAndXNlciBpcyBub3QgZm91bmQnIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVxLnVzZXIgPSB1c2VyO1xyXG4gIG5leHQoKTtcclxufTtcclxuIl19